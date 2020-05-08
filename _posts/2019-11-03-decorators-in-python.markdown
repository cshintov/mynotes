---
published: false
layout: post
title:  "Beautify your functions with decorators!"
date:   2019-11-03 17:02:34 +0530
categories: python fp
tags: [python, fp]
---
Functions are beautiful when they are small! 

They are small when they do only one thing. Just what [single responsibility] principle recommends. 

One way to achieve this is by using decorators.

A decorator is used to add something extra to a function without modifying the actual function definition.

For example if we want to log the calling of a function, adding it to each and every function is ugly, and not very [DRY]. 

Instead, we can define a [decorator] which does this and decorate all the functions with it.

### Log calling of a function with a decorator: <br>
``` python
def log_call(func):

    def inner(*args, **kwargs):
        print "calling {}".format(func.__name__)
        if args:
            print "with arguments: {}".format(str(args))
        if kwargs:
            print "with keyword arguments: {}".format(str(kwargs))
        return func(*args, **kwargs)

    return inner


@log_call
def add(a, b=5):
    return a + b

@log_call
def sub(a, b):
    return a - b

@log_call
def printer(string):
    print string

print add(2, 3)
print sub(2, 3)
printer("Hello world!")
print add(2, b=3)
```

```
 OUTPUT

 calling add
 with arguments: (2, 3)
 5
 calling sub
 with arguments: (2, 3)
 -1
 calling printer
 with arguments: ('Hello world!',)
 Hello world!
 calling add
 with arguments: (2,)
 with keyword arguments: {'b': 3}
 5

```

Calling any function decorated with `log_call` will log the call and execute the called function. This decorator might be useful while debugging your code.

[single responsibility]: https://en.wikipedia.org/wiki/Single_responsibility_principle
[DRY]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[decorator]: https://realpython.com/primer-on-python-decorators/
