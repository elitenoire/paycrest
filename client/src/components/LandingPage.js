import React, {Fragment} from 'react';
import { Link } from 'react-router-dom'
import { ReactComponent as HeroSvg } from '../assets/img/hero.svg'

const LandingPage = () => {
    return (
        <Fragment>
            <section class="hero is-fullheight-with-navbar brand-gradient">
                <div class="hero-body">
                    <div class="container">
                        <div class="columns is-multiline is-centered">
                            <div class="column is-three-quarters-tablet is-half-desktop has-mb-5">
                                <div class="container is-fluid has-text-centered-touch">
                                    <h1 class="title hero-title is-2 is-size-1-tablet">
                                        Smart People. <br />
                                        Smarter Network.
                                    </h1>
                                    <h2 class="subtitle hero-subtitle is-4 is-size-3-tablet">
                                        Have lots of stuff to do? Embroaden your connections with just a tap.
                                    </h2>
                                    <br />
                                        <Link 
                                        className="button is-large is-info is-outlined is-rounded has-depth"
                                        to="/get-started"
                                        >
                                        Get Started
                                        </Link>
                                </div>
                            </div>
                            <div class="column is-hidden-mobile is-half-tablet is-clipped">
                                <div class="container is-fluid">
                                    <HeroSvg width="100%" height="100%"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section class="container">
                <div class="columns features">
                    <div class="column is-full"></div>
                    <div class="column is-full"></div>
                    <div class="column is-full"></div>
                </div>
            </section> */}
        </Fragment>
    );
}

export default LandingPage
