This is one more in the series of mini-projects I have putting up on GitHub.
This one uses Flask-restfull for the backend and Angular-CLI 9 for the
frontend. After building the frontend, I compiled the package using

    ng build

and moving the resulting built package in to 'static' directory of Flask
package. Before running the app first the database has to be initialised with the
following commands:

    flask db init
    flask db migrate
    flask db upgrade

After that the application can be run using

    flask run

Good luck!
