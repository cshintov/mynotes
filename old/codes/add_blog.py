"""
Create a new blog post in _posts folder with the name in correct format

    DDDD-MM-YY-<name>.markdown

    ex:
    2019-11-02-fun-with-fibonacci.markdown
"""
from pdb import set_trace
import pytz
import click
import datetime

IST = pytz.timezone(pytz.country_timezones['IN'][0])
POSTS = './_posts'
FRONT = {
    'layout': 'post',
    'title':  "Fun with fibonacci!",
    'date':   "2019-11-02 13:45:34 +0530",
    'categories': "common"
}

def sandwich(string, addendum):
    return '\n'.join([addendum, string, addendum])

def front_matter(values_map):
    """ Generate jekyll frontmatter """
    FRONT.update(values_map)
    # set_trace()
    lines = [
        '{}: {}'.format(key, val)
        for key, val in FRONT.items()
    ]

    return sandwich('\n'.join(lines), '---')


def get_date(fmt="%Y-%m-%d"):
    """ Get the date in DDDD-MM-YY format """
    now = datetime.datetime.now().replace(tzinfo=IST)

    return now.strftime(fmt)


def new_blog(blog, template):
    """ Creates a new blog in _posts directory """
    path = '/'.join([POSTS,  blog])
    with open(path, 'w') as blg:
        blg.write(template)


@click.command()
@click.option('--date', default=get_date(), help='date prefix')
@click.option('--blog', prompt='Blog name', help='Name of the blog')
def main(blog, date):
        """Creates new blog with specified name"""
        template = front_matter({
                "title": blog,
                "date": get_date("%Y-%m-%d %H:%M:%S %z"),
            })
        new_blog(date + '-' + blog + '.markdown', template)


if __name__ == '__main__':
    main() 
