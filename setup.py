#!/usr/bin/env python
import logging
import os
from pathlib import Path

import setuptools


setuptools.setup(
    name="time tracker backend",
    version="0.1",
    description="backend for time tracker app",
    install_requires=[
        'tornado==6.0.3',
        'SQLAlchemy==1.3.7'
    ],
    py_modules=["backend"],
    classifiers=(
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ),
    entry_points="""\
      [console_scripts]
      backend=backend:main
      """
)
