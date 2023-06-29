---
published: true
layout: post
title: "Beautify your functions with decorators!"
date: 2020-05-09 10:04:31 +0530
tags: [python, decorators, DRY, SRP, functional programming, closure]
---

Hello coders! I'm going to take you on a magical journey through one of Python's most enchanted features: Decorators. Oh yes, and believe me when I say, this isn't your grandma's interior design. We're diving into a world where Python's old-school functions get a mind-blowing, reality-altering, time-traveling facelift.

Now, let's be real. We've all been there. You're chugging away at your code, your function is doing exactly what it's supposed to do, and life is just peachy. But then, the universe decides to throw a wrench into your perfect coding machinery. You need your function to do a little extra, but you don't want to tamper with its existing elegance.

Enter: Python decorators.

Like a mystical wizard with a magic wand, Python decorators swoop in and alter the behavior of your function without the need for any invasive surgery. It's like the proverbial cherry on top of your function sundae, sprinkling in some extra functionality while preserving the original flavor. It's like turning your function into a Transformer, more than meets the eye.

Before we get to the meat of it, let's take a step back. What the heck is a Python decorator anyway?

Let's say you've got a Python function, a simple, innocent little block of code. Now, you want this function to put on a Superman cape and start doing some extra heavy lifting. The Python decorator is that magical wardrobe that lets your function step in as Clark Kent and step out as Superman.

In Python, everything is an object, even functions. Functions can be passed around, returned, you name it. A decorator is simply a function that takes another function, does something with it, and then hands it back. It's like a fancy function dressing room.

Here's a simple example:

```python
def my_decorator(func):
    def wrapper():
        print("Do something before the function call")
        func()
        print("Do something after the function call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")
```

Did you see that? That's the magic right there. The @my_decorator syntax is Python's way of saying "let's take this function for a spin through the decorator". It's as if say_hello() had a quick trip to the costume department, put on a superhero outfit, and came back with some added superpowers.

Let's call the function now:

```python
say_hello()
```

And voila! You'll see:

```
Do something before the function call
Hello!
Do something after the function call
```

Decorators can be as simple or as complex as you need them to be, adding any number of additional layers to your function. Like an onion, or a parfait, because everyone likes parfait. Decorators let you add reusable blocks of functionality, making your code DRYer than the Sahara desert and more modular than a Lego set.

Python decorators, ladies and gentlemen: the magic wand that turns your everyday functions into supercharged coding superheroes. They're not just a feature, they're a party trick that makes you the life of the coding fiesta.

Until next time, stay magical, coders!
