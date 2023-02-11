import React from "react";
import type { InferGetStaticPropsType, NextPage } from "next";
//import Link from "next/link";
import Head from "next/head";
import { GlobeAltIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

import paypalIcon from "simple-icons/icons/paypal.svg";
import amazonIcon from "simple-icons/icons/amazon.svg";
import twitchIcon from "simple-icons/icons/twitch.svg";

import { TwitchEmbed } from "../../components/TwitchEmbed";
import { Headline } from "../../components/shared/Headline";
import {
  LinkBox,
  LinkBoxIcon,
  LinkBoxSocials,
} from "../../components/shared/LinkBox";
//import { getAmbassadorsData } from "../utils/data";
//import { CardSwiper } from "../components/shared/CardSwiper";
//import { AmbassadorCard } from "../components/about/AmbassadorCard";
//import { WeatherInfo } from "../components/WeatherInfo";
//import { TimeInfo } from "../components/TimeInfo";
//import { getWeatherData } from "../utils/weather-data";

export async function getStaticProps() {
  //const ambassadors = await getAmbassadorsData();
  //const weatherData = await getWeatherData();

  return {
    props: {
      /*weatherData, ambassadors */
    },
    //revalidate: weatherData ? 15 * 60 : undefined,
  };
}

export type LivePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Live: NextPage<LivePageProps> = (
  {
    /* weatherData, ambassadors */
  }
) => {
  //const currentAmbassadors = ["tico", "miley", "mia", "siren"];

  return (
    <>
      <Head>
        <title>Alveus.gg</title>
      </Head>

      <main>
        <header className="sr-only">
          <h1>Live stream</h1>
        </header>

        <div>
          <TwitchEmbed />

          {/*
          <div className="flex flex-col border-t border-t-black bg-gray-900 text-white md:flex-row">
            <div className="order-2 flex flex-shrink-0 flex-col justify-center p-2 md:order-1 md:border-r">
              <p className="mb-2 w-full text-center text-xl">
                <TimeInfo />
              </p>
              {weatherData && <WeatherInfo weatherData={weatherData} />}
            </div>
            <div className="order-1 flex-1 overflow-hidden p-2 md:order-2 md:border-r">
              <div className="flex w-full justify-between px-4">
                <strong>On screen:</strong>
                <Link
                  className="rounded-xl border border-transparent py-0.5 px-3 italic text-gray-200 hover:border-white"
                  href="/explore"
                >
                  Show all &rArr;
                </Link>
              </div>
              <div className="-mx-4 overflow-x-auto overflow-y-hidden">
                {!currentAmbassadors.length && (
                  <p className="py-2 px-5">No ambassadors found!</p>
                )}
                <CardSwiper
                  className="px-4"
                  slideClasses="h-full w-[110px] lg:w-[120px] py-1"
                  cards={currentAmbassadors.map((name) => {
                    const data = ambassadors[name];
                    return (
                      data && (
                        <AmbassadorCard
                          layout="small"
                          key={name}
                          ambassador={data}
                        />
                      )
                    );
                  })}
                />
              </div>
            </div>
            <div className="order-3 flex flex-1 flex-col gap-4 p-4">
              <p>
                <Link
                  rel="noreferrer"
                  target="_blank"
                  href="https://streamelements.com/alveussanctuary/tip"
                >
                  <strong>Donate</strong> live via StreamElements
                </Link>
              </p>
              <p>
                <strong>!hat</strong> Try and get the hat onto the ambassador by
                donating at least $1 or cheering 100 bits while using !hat in
                your message. A subscription gives 3 hats.
              </p>
            </div>
          </div>
          */}

          <div className="border-t border-t-black px-5 pb-12">
            <Headline>Links</Headline>

            <LinkBox>
              <LinkBox.Link href="https://www.alveussanctuary.org/">
                <GlobeAltIcon className="h-8 w-8" />
                Website
              </LinkBox.Link>
              <LinkBoxSocials />
            </LinkBox>

            <Headline>Support Alveus</Headline>
            <LinkBox>
              <LinkBox.Link href="https://www.twitch.tv/subs/alveussanctuary">
                <LinkBoxIcon src={twitchIcon} />
                Subscribe on Twitch
              </LinkBox.Link>
              <LinkBox.Link href="https://www.alveussanctuary.org/merch">
                <GlobeAltIcon className="h-8 w-8" />
                Buy merch
              </LinkBox.Link>
              <LinkBox.Link href="https://www.alveussanctuary.org/wishlist">
                <LinkBoxIcon src={amazonIcon} />
                Amazon Wishlist
              </LinkBox.Link>
              <LinkBox.Link href="https://www.alveussanctuary.org/smile">
                <LinkBoxIcon src={amazonIcon} />
                Amazon Smile
              </LinkBox.Link>
              <LinkBox.Link href="https://www.alveussanctuary.org/donate">
                <LinkBoxIcon src={paypalIcon} />
                Donate
              </LinkBox.Link>
            </LinkBox>

            <div className="flex gap-2 p-4">
              <EnvelopeIcon className="h-8 w-8" />
              <p>
                Want to send something to support the animals and Alveus? <br />
                Here is Alveus the PO Box: <br />
                500 E Whitestone Blvd #2350, Cedar Park, TX 78613
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Live;