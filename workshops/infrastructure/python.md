# Python Infrastructure

Most of the project components and the workshop exercises need to be completed in Python.
We suggest that you use the latest version of Python 2.7.x since many Python libraries do not
support Python 3.x yet.

There are various ways to get you going and running with Python, e.g. using pre-installed Python
available in the computer labs or install your Python from scratch in your own laptop.
We don't dictate the choice of Python installation, but it is ideal that you and your team members share the same Python setup for the benefit of the project.

To get Python set up, please find several options:

### 1. Ananconda's Python Distribution

Ananconda is basically a collection of Python, various useful libraries (modules),
and tools that support the management of the whole collection. It provides many useful libraries for data processing and data science in general.

In the computer lab, Anaconda should be installed in `C:\Anaconda2` directory. To test this installation, use the following commands.

    C:\> set path=C:\Anaconda2;C:\Anaconda2\Scripts;C:\Anaconda2\Library\bin;%path%
    C:\> python

If you want to install your own computer, you can download the distribution for the appropriate version and operating system from: [https://www.continuum.io/downloads](https://www.continuum.io/downloads). We suggest you use version 2.x because, while Python 3.x is great and better,
many useful Python libraries are still developed only for Python 2.x.

When installing Anaconda in your own PC/laptop, just follow the installation instruction and leave the default options as they are. Install in any location that you have access to. It may also be a good idea to install Anaconda in your external drive (USB thumbdrive) so you can have a portable version of Python.

\\{div class="exercise"

#### Installing Anaconda in Computer Lab (if it's not available)

If you install in the computer lab, Anaconda can be installed under your home directory (`username` is your login id):

    C:\Users\username\AppData\Local\Continuum\Anaconda2

Often you have multiple versions/installations of Python in your computer and
sometimes calling `python` from the command line launches an incorrect version. To solve this,
get your `path` to point to the location of the Python installation (replace `username` with your own login id).

    C:\> set path=C:\Users\username\AppData\Local\Continuum\Anaconda2; ^
      C:\Users\username\AppData\Local\Continuum\Anaconda2\Scripts; ^
      C:\Users\username\AppData\Local\Continuum\Anaconda2\Library\bin;%path%
    C:\> python

\\}

Once Anaconda is installed, you should be able to launch `python` from the command line
and you should see the version of Python that you have:

    C:\>python
    Python 2.7.11 |Anaconda 2.5.0 (x86_64)| (default, Dec  6 2015, 18:57:58)
    [GCC 4.2.1 (Apple Inc. build 5577)] on darwin

If that does not work, you can call python using its full path:

    C:\Users\username\AppData\Local\Continuum\Anaconda2\python.exe

or:

    C:\Anaconda2\python.exe

Once you are able to launch Anaconda's Python, you can also use two useful tools **spyder**
and **jupyter**. **Spyder** is IDE (Integrated Development Environment, advanced editor) for Python that allows you debug your Python code interactively.

    C:\> spyder

**Jupyter** is a platform where you can work with iPython notebook.
It is the best platform for you to interactively play with Python (e.g display the visualisation in context).

    C:\> jupyter notebook

The command above will launch an application server that can be accessed from the following url:

    http://localhost:8888/

This is basically like having your own web-based Python environment (similar to Grok). To try jupyter, select **New - Python 2** file. In the `In` cell, type in the following code:

    %matplotlib inline

    import matplotlib
    from pylab import *

    def f(t):
      return cos(2 * pi * t)*log(1 + t)

    precision = 0.1 # change to 0.02
    t = arange(0.0, 5.0, precision)
    plot(t, f(t), 'k')

Presss Shift-Enter to execute the code. You should see a graph generated for you.

### 2. pythonanywhere

[pythonanywhere](https://www.pythonanywhere.com) is a cloud-based Python platform that provides hosting for Python codes and in-browser Python console (in the similar way to IVLE). You can develop your application using various frameworks: Django, web2py, Bottle, Flask, and WSGI (unfortunately, no CGI support).

#### Other useful resources:

**[Enthought Canopy](https://store.enthought.com/)** is an Anaconda's alternative. It is also a Python distribution that
provides a scientific and analytic capabilities plus integrated tools for data analysis. It has more GUI tools compared to Anaconda.

**[AMPPS](http://ampps.com/)** provides web server (Apache) and python capability. This can be used to host and test your CGI script locally in your computer.
