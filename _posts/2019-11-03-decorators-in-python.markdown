---
published: true
layout: post
title: "Beautify your functions with decorators!"
date: 2020-05-09 10:04:31 +0530
categories: python fp
tags: [python, decorators, DRY, SRP, functional programming, closure]
---
Functions are beautiful when they are small! 

They are small when they do only one thing. A sort of [single responsibility principle] 
for functions, if you will.

One way to achieve this is by using decorators. 

A [decorator] can be used to add some extra functionality to a function without modifying the actual function definition.

For example if we want to log the calling of a function, adding that functionality to a function 
definition violates the [single responsibility principle]. Besides, adding it to each and every 
function is ugly, and not very [DRY]. 

Instead, we can define a decorator which does this and decorate all the functions with it.

### Log calling of a function with a decorator
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

### How does it work?

Whenever a function is decorated with `log_call` we are baking a new function with the additional
functionality and assigning the decorated function's name to it. 

When we call `add`, we are actually calling the `decorated add`.

```
@log_call
def add(a, b=5)
```
is a syntactig sugar for:
```
add = log_call(add) 
print add(2, 3) # calling decorated 'add'
```

[single responsibility principle]: https://en.wikipedia.org/wiki/Single_responsibility_principle
[DRY]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[decorator]: https://en.wikipedia.org/wiki/Python_syntax_and_semantics#Decorators
