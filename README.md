[![Netlify Status](https://api.netlify.com/api/v1/badges/047a0bd7-2703-48ca-8bd8-07b1151857c4/deploy-status)](https://app.netlify.com/sites/namelessapp/deploys)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/singhkshitij/nameless-ui">
    <img src="public/assets/images/anonymous.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Nameléss</h3>

  <p align="center">
    An anonymous feedback platform with realtime chat support !
    <br />
    <a href="https://namelss.com"><strong>Launch app »</strong></a>
    <br />
    <br />
    <a href="https://docs.google.com/document/d/1Yhp8g4n9ISx1rKzYzL-qt9fs8BNQRiLf0agn9uY8sFk/edit">ADR doc</a>
    ·
    <a href="https://github.com/singhkshitij/nameless-ui/issues">Report Bug</a>
    ·
    <a href="https://github.com/singhkshitij/nameless-ui/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Usecases](#use-cases)
  * [Built With](#built-with)
  * [Why is it needed?](#why-is-it-needed) 
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project
* No login no auth required
* Real Time feedback sessions
* It helps with :
    - People giving feedback can be totally anonymous
    - Host can interact and introspect feedback with audience realtime
    - No limit on number of people that can join the same room at a time
    - No context of the data being stored

[![Product Name Screen Shot][product-screenshot]](https://namelss.com)

### Use Cases
* A manager taking feedback from his/her team members
* A online teacher requesting feedback from students
* Post presentation feedbacks in conferences
* More real world scenarios you can think of...

### Why is it needed? 
* Given that there are number of anonymous feedback tools already available, what make Namelss unique is its ability to interact real time while being anonymous.
* Google forms · 15Five · ‎Officevibe · ‎TinyPulse · ‎Qualtrics etc do not allow you to interact realtime. 

### Built With
Tech stack used : 
* [Frontend - React](https://reactjs.org/)
* [Backend - Clojure](https://clojure.org/)
* [Database - Postgres](https://www.postgresql.org/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/singhkshitij/nameless-ui.git
```
3. Install NPM packages
```sh
npm install
```
4. Enter your API in `config.js`
```JS
npm start
```

<!-- ROADMAP -->
## Roadmap
To check what is in progress and about to get delivered, head over to the [ADR doc](https://docs.google.com/document/d/1Yhp8g4n9ISx1rKzYzL-qt9fs8BNQRiLf0agn9uY8sFk/edit#heading=h.a4u119gnl3b7).

See the [open issues](https://github.com/singhkshitij/nameless-ui/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the GPL-3.0 License. See [LICENSE](https://github.com/singhkshitij/nameless-ui/blob/master/LICENSE) for more information.

<!-- CONTACT -->
## Contact

Kshitij Singh - [@ikshitijsingh](https://twitter.com/ikshitijsingh) - <a href="mailto:singh_kshitij@yahoo.com">Email</a>

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Img Shields](https://shields.io)
* Logo by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> Flaticon</a>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/singhkshitij/nameless-ui.svg?style=flat-square
[contributors-url]: https://github.com/singhkshitij/nameless-ui/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/singhkshitij/nameless-ui.svg?style=flat-square
[forks-url]: https://github.com/singhkshitij/nameless-ui/network/members
[stars-shield]: https://img.shields.io/github/stars/singhkshitij/nameless-ui.svg?style=flat-square
[stars-url]: https://github.com/singhkshitij/nameless-ui/stargazers
[issues-shield]: https://img.shields.io/github/issues/singhkshitij/nameless-ui.svg?style=flat-square
[issues-url]: https://github.com/singhkshitij/nameless-ui/issues
[license-shield]: https://img.shields.io/github/license/singhkshitij/nameless-ui.svg?style=flat-square
[license-url]: https://github.com/singhkshitij/nameless-ui/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ikshitijsingh/
[product-screenshot]: https://github.com/singhkshitij/nameless-ui/blob/master/namelss-ss.png