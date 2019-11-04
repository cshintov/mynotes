""" Illustrate decorators """
def print_line(func, length=10):

    def inner(*args, **kwargs):
        print '-' * length
        result = func(*args, **kwargs)
        print 'result: ', result
        print '-' * length + '\n'
        return result

    return inner

def log_call(func):

    def inner(*args, **kwargs):
        print "calling {}".format(func.__name__)
        if args:
            print "with arguments: {}".format(str(args))
        if kwargs:
            print "with keyword arguments: {}".format(str(kwargs))
        return func(*args, **kwargs)

    return inner


@print_line
@log_call
def add(a, b=5):
    return a + b

@print_line
@log_call
def sub(a, b):
    return a - b

@print_line
@log_call
def printer(string):
    print string

add(2, 3)
sub(2, 3)
printer("Hello world!")
add(2, b=3)
