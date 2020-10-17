---
layout: post
title: Is Javascript asynchronous?
date: 2020-10-16 12:30:30 +0553
tags: [Javascript, Nodejs, asynchronous programming]
---

Currently I am trying my hand at NodeJs. Coming from a Python background the asynchronous execution of code was a mystery to me.
So, I had to really understand what's going on behind the scenes and why things happen in a surprising order in this part of the world. 
Last few days I spent some time reading blogs and talks on this subject. I hope I can share with you what I have learned about 
the mystery of asynchronicity of Javascript.

## Helloworld of Asynchronous Javascript

{% highlight Javascript %}
console.log('Start...');

function callback(){
    console.log('Middle part of the code...!');
}

const executeAfter = 0;

// Execute `callback` after `executeAfter` milliseconds
setTimeout(callback, executeAfter);

console.log('Finished!');

----------------OUTPUT------------------------
Start...
Finished!
Middle part of the code...!

{% endhighlight %}

So, what's happening here? One would expect the output to flow in normal/synchronous order, start, middle and finish.
But that's not the case.  Why?

Before talking about the why, let us talk a little bit about Javascript. Specifically, about what runs Javascript code.

Be it a browser or Nodejs the common factor is a Javascript engine which actually runs Javascript code. 
In the case of Chrome and Nodejs, that component is V8. The V8 engine consists of three main parts, namely the parser,
Ignition (the interpreter) and Turbofan (the optimizing compiler).

```

 code    ┌────────┐  AST    ┌───────────┐ Bytecode ┌──────────┐
-------> │ Parser │-------->│  Ignition │--------->│ Turbofan │---->Machinecode
         └────────┘         └───────────┘          └──────────┘
```

The V8 parser generates an abstract syntax tree after parsing the Javascript code. The AST is interpreted by Ignition
to generate the corresponding Bytecode which in turn is used by Turbofan to generate native machinecode to execute.

Now, let's talk about why the above code runs in that order. The culprit here is `setTimeout`, it's a special function. 
The `setTimeout` is an asynchronous function call which will execute the callback function after the given 
time period of `executeAfter`.  But the execution doesn't wait till this is done, it moves onto the next step. 
Hence the weird order, or the asynchronous order.

If it were just V8, the above code will not even work, because `setTimeout` is not part of the Javascript specification 
and hence V8 doesn't implement it. Also, V8 doesn't provide any of the other asynchronous features that we normally use 
in our apps and sites. In other words Javascript as implemented by V8 and other Javascript engines are meant for synchronous 
execution and is similar to other languages like Python and Ruby in that regard.

So who provides the asynchronous features to Nodejs? 

The notorious `Event Loop`!

## libuv and The Event Loop

Meet `libuv`, the other major component of Nodejs. It is the asynchronous I/O engine of the Nodejs runtime 
environment that provides Nodejs with necessary features to take care of I/O tasks like reading a file, network calls 
and other asynchronous apis like `setTimeout`, `setInterval`, `setImmediate`, etc.

If you refer [Event loop and nexttick](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) you will
see a diagram depicting the eventloop. I am adding below a simplified loop that I feel relevant to this discussion.

```

                                          ┌───────────────────────────┐
                                       ┌─>│           timers          │
                                       │  └─────────────┬─────────────┘
              Interrupts               │  ┌─────────────┴─────────────┐      ┌───────────────┐ 
 ┌──────────────────<──────────────────┤  │           poll            │<─────┤  connections, │
 │                                     │  └─────────────┬─────────────┘      │   data, etc.  │
 │                                     │  ┌─────────────┴─────────────┐      └───────────────┘
 │                                     └──│           check           │
 │                                        └───────────────────────────┘
 │                                                The EventLoop  
 │  ┌───────────────────────────┐      
 │  │        process.nextTick   │
 │  └─────────────┬─────────────┘
 │  ┌─────────────┴─────────────┐      
 └──┤        Microtasks         │
    └───────────────────────────┘
            Not Event Loop
```

And the corresponding async actions that happen in each of those phases of the eventloop.

```
                          ┌───────────────────────────┐
                       ┌─>│    setTimout,setInterval  │
                       │  └─────────────┬─────────────┘      ┌───────────────┐
    Interrupts         │  ┌─────────────┴─────────────┐      │   incoming:   │
 ┌─────────<───────────│  │  poll and I/O callbacks   │<─────┤  connections, │
 │                     │  └─────────────┬─────────────┘      │   data, etc.  │
 │                     │  ┌─────────────┴─────────────┐      └───────────────┘
 │                     └──┤       setImmediate        │
 │                        └───────────────────────────┘
 │                                The EventLoop  
 │  ┌───────────────────────────┐      
 └──┤        process.nextTick   │
    └─────────────┬─────────────┘
    ┌─────────────┴─────────────┐      
    │         Promise           │
    └───────────────────────────┘
            Not Event Loop

```

Each phase of the event loop has its own queue. At each phase the event loop processes the queue 
until it's exhausted and moves onto the next. At each transition to the next phase it peeks outside the loop
to `process.nextTick` queue and the micro-tasks queue. If there are callbacks in the `process.nextTick` queue, 
they are run until the queue is exhausted. Next it checks the microtasks queue, which contains the callbacks 
associated with `Promises`. They are run next. Only then the event loop continues with the next phase. 
Please note that these two queues are not part of the eventloop.

The phases of the event loop are roughly as explained below:
```
1. Timers
    The callbacks from `setTimeout` and `setInterval` calls are executed 
    if the respective timers are done. Note that the callbacks associated with the timers are 
    enqueued only if the respective timer crosses the given threshold.
2. Poll
    The event loop polls for I/O events until its time to execute the timer callbacks. 
    That is if any timer crosses its threshold while the loop polls for I/O, the eventloop 
    loop backs to timer phase. If not the available I/O callbacks are executed.
3. Check
    Here any `setImmediate` callbacks are executed.
```

One more important detail to remember; the callbacks from eventloop gets executed only if the normal callstack maintained
by the V8 engine for the execution of synchronous calls, is empty. This is the reason why all the synchronous calls gets executed 
prior to the handling of asynchronous callbacks.

If I have done a decent job of explaining the loop you should be able to predict the order of execution of the below code or 
at least explain it's output.

{% highlight Javascript %}
setTimeout(() => console.log('set timeout'), 0);
setImmediate(() => console.log('set immediate1'));

process.nextTick(() => console.log('next tick1'));
console.log('Console log after next tick1');

Promise.resolve().then(() => console.log('promise1 resolved'));
Promise.resolve().then(() => console.log('promise2 resolved'));
Promise.resolve().then(() => {
    console.log('promise3 resolved');
    process.nextTick(() => console.log('next tick2 in Promise3'));
    setImmediate(() => console.log('set immediate2 in Promise3'));
});
Promise.resolve().then(() => console.log('promise4 resolved'));

setImmediate(() => console.log('set immediate3'));
setImmediate(() => console.log('set immediate4'));

process.nextTick(() => console.log('next tick3'));
console.log('Console log at the end!');

----------------OUTPUT------------------------
Console log after next tick1
Console log at the end!
next tick1
next tick3
promise1 resolved
promise2 resolved
promise3 resolved
promise4 resolved
next tick2 in Promise3
set timeout
set immediate1
set immediate3
set immediate4
set immediate2 in Promise3
{% endhighlight %}


## Summary

Javascipt is synchronous. Nodejs is asynchronous because Nodejs is V8 + `libuv`. V8 runs Javascript, libuv provides asynchronous I/O. And 
all the asynchronous magic happens in `The Event Loop` provided by `libuv`.

Well, that's it for now! Thanks for reading my blog and I hope you got something out of it, Cheers!


## Reference

* [What the heck is the event loop anyway](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
* [Event loop and nexttick](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) 
* [The I/O loop in libuv](http://docs.libuv.org/en/v1.x/design.html#the-i-o-loop)
* [Talk: Intro to libuv](https://www.youtube.com/watch?v=_c51fcXRLGw)
* [Bert Bilder's talk on event loop](https://www.youtube.com/watch?v=PNa9OMajw9w)
* [Talk: Event loop inside out](https://www.youtube.com/watch?v=P9csgxBgaZ8)
* [Deepal's blog series on Event Loop](https://blog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810)
* [Javascript engines - how do they even?](https://www.youtube.com/watch?v=p-iiEDtpy6I)
