import React, { Fragment, useMemo } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link, { type LinkProps } from "next/link";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { useIsActivePath } from "../../shared/hooks/useIsActivePath";
import socials from "../../shared/data/socials";

import logoImage from "../../../assets/logo.png";

import IconAmazon from "../../../icons/IconAmazon";
import IconAngleDown from "../../../icons/IconAngleDown";
import IconSignIn from "../../../icons/IconSignIn";

import { ProfileInfo, ProfileInfoImage } from "./ProfileInfo";
//import { NotificationsButton } from "./NotificationsButton";

type NavLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;

const NavDropdownClasses =
  "absolute top-full right-0 z-30 mt-2 min-w-[10rem] flex flex-col rounded bg-alveus-green-900 p-2 shadow-lg";
const NavLinkClassesActive =
  "bg-alveus-green lg:border-white lg:bg-transparent";
const NavLinkClassesHover =
  "hover:bg-alveus-green hover:lg:border-white hover:lg:bg-transparent";
const NavLinkClasses = `block px-5 py-3 h-full border-b-2 border-transparent ${NavLinkClassesHover} transition-colors`;

const NavLink: React.FC<NavLinkProps> = ({ href, className, ...props }) => {
  const isActive = useIsActivePath(href);
  const classes = useMemo(
    () =>
      [NavLinkClasses, isActive && NavLinkClassesActive, className]
        .filter(Boolean)
        .join(" "),
    [isActive, className]
  );

  return <Link href={href} className={classes} {...props} />;
};

type NavStructureLink = {
  title: string;
  link: string;
};

type NavStructureDropdown = {
  title: string;
  dropdown: {
    [key: string]: NavStructureLink;
  };
};

type NavStructure = {
  [key: string]: NavStructureLink | NavStructureDropdown;
};

const structure: NavStructure = {
  home: {
    title: "Home",
    link: "/",
  },
  live: {
    title: "Live",
    link: "/live",
  },
  explore: {
    title: "Explore",
    dropdown: {
      live: {
        title: "Ambassadors",
        link: "/ambassadors",
      },
      showAndTell: {
        title: "Show and Tell",
        link: "https://www.alveussanctuary.org/show-and-tell/",
      },
      collaborations: {
        title: "Collaborations",
        link: "/collaborations",
      },
      events: {
        title: "Events",
        link: "/events",
      },
    },
  },
  about: {
    title: "About",
    dropdown: {
      alveus: {
        title: "Alveus",
        link: "/about/alveus",
      },
      maya: {
        title: "Maya",
        link: "/about/maya",
      },
      staff: {
        title: "Staff",
        link: "/about/staff",
      },
      advisoryBoard: {
        title: "Advisory Board",
        link: "/about/advisory-board",
      },
      boardOfDirectors: {
        title: "Board of Directors",
        link: "/about/board-of-directors",
      },
      annualReports: {
        title: "Annual Reports",
        link: "/about/annual-reports",
      },
    },
  },
  donate: {
    title: "Donate",
    link: "/donate",
  },
  merch: {
    title: "Merch",
    link: "/merch-store",
  },
};

const utilities = {
  amazon: {
    link: "/wishlist",
    title: "Amazon Wishlist",
    icon: IconAmazon,
  },
  ...socials,
};

export const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <Disclosure
      as="header"
      className="relative z-20 bg-alveus-green-900 text-white lg:bg-transparent"
    >
      {({ open }) => (
        <>
          <div className="container mx-auto flex gap-4 p-2">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center px-1 md:px-2"
              aria-label="Alveus.gg"
            >
              <Image
                src={logoImage}
                alt=""
                height={120}
                className="h-10 w-auto lg:mt-6 lg:h-28"
              />
            </Link>

            {/* Desktop menu */}
            <div className="hidden flex-grow flex-col gap-2 lg:flex">
              <div className="flex items-center gap-4">
                <ul className="flex flex-grow items-center justify-end gap-4">
                  {Object.entries(utilities).map(([key, link]) => (
                    <li key={key}>
                      <a
                        className="block rounded-xl bg-transparent p-2 text-white transition-colors hover:bg-white hover:text-alveus-green"
                        href={link.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.title}
                      >
                        <link.icon size={24} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-4 border-t border-white pt-2">
                <Link href="/" className="font-serif text-3xl font-bold">
                  Alveus.gg
                </Link>
                <ul className="flex flex-grow justify-end">
                  {Object.entries(structure).map(([key, link]) => (
                    <li key={key}>
                      {(link as NavStructureLink).link && (
                        <NavLink href={(link as NavStructureLink).link}>
                          {link.title}
                        </NavLink>
                      )}
                      {(link as NavStructureDropdown).dropdown && (
                        <Menu as="div" className="relative">
                          {({ open }) => (
                            <>
                              <Menu.Button
                                className={[
                                  NavLinkClasses,
                                  open && NavLinkClassesActive,
                                  "flex items-center gap-2",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                              >
                                {link.title}
                                <IconAngleDown
                                  size={16}
                                  className={`${
                                    open ? "translate-y-1" : "translate-y-0.5"
                                  } transition-transform`}
                                />
                              </Menu.Button>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  as="ul"
                                  className={NavDropdownClasses}
                                >
                                  {Object.entries(
                                    (link as NavStructureDropdown).dropdown
                                  ).map(([key, link]) => (
                                    <Menu.Item as="li" key={key}>
                                      {({ active, close }) => (
                                        <NavLink
                                          href={link.link}
                                          className={`w-full min-w-max ${
                                            active ? NavLinkClassesActive : ""
                                          }`}
                                          onClick={close}
                                        >
                                          {link.title}
                                        </NavLink>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                      )}
                    </li>
                  ))}

                  {/* Notifications toggle */}
                  {/*<li>*/}
                  {/*  <NotificationsButton />*/}
                  {/*</li>*/}

                  {/* User menu */}
                  <li>
                    {sessionData ? (
                      <Menu
                        as="div"
                        className="relative flex h-full items-center"
                      >
                        <Menu.Button
                          as="div"
                          className="mx-4 cursor-pointer select-none appearance-none rounded-full border-2 border-transparent transition-colors hover:border-white aria-expanded:border-white"
                        >
                          <span className="sr-only">Open user menu</span>
                          <ProfileInfoImage />
                        </Menu.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className={NavDropdownClasses}>
                            <Menu.Item disabled>
                              <div className="px-5 py-3">
                                <ProfileInfo full />
                              </div>
                            </Menu.Item>

                            <Menu.Item disabled>
                              <div className="border-t opacity-30"></div>
                            </Menu.Item>

                            <Menu.Item>
                              {({ active, close }) => (
                                <button
                                  className={`text-left ${NavLinkClasses} ${
                                    active ? NavLinkClassesActive : ""
                                  }`}
                                  type="button"
                                  onClick={() => {
                                    close();
                                    signOut();
                                  }}
                                >
                                  Log Out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <button
                        className={NavLinkClasses}
                        type="button"
                        onClick={() => signIn("twitch")}
                        title="Sign in"
                      >
                        <span className="sr-only">Sign in</span>
                        <IconSignIn size={20} className="mx-1" />
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex flex-grow items-center justify-center lg:hidden">
              <Link href="/" className="font-serif text-3xl font-bold">
                Alveus.gg
              </Link>
            </div>
            <div className="flex items-center lg:hidden">
              <Disclosure.Button
                className="
                  inline-flex
                  items-center justify-center rounded-md
                  p-2 text-gray-200
                  hover:bg-gray-900
                  hover:text-white focus:outline-none
                  focus:ring-2 focus:ring-inset focus:ring-blue-500
                  "
              >
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel>
            <div className="space-y-1 p-2 pb-4 lg:hidden">
              <ul className="flex flex-col">
                {Object.entries(structure).map(([key, link]) => (
                  <li key={key}>
                    {(link as NavStructureLink).link && (
                      <Disclosure.Button
                        as={NavLink}
                        href={(link as NavStructureLink).link}
                        className="w-full"
                      >
                        {link.title}
                      </Disclosure.Button>
                    )}
                    {(link as NavStructureDropdown).dropdown && (
                      <>
                        <p className="px-5 py-3 opacity-80">{link.title}</p>
                        <ul className="ml-4">
                          {Object.entries(
                            (link as NavStructureDropdown).dropdown
                          ).map(([key, link]) => (
                            <li key={key}>
                              <Disclosure.Button
                                as={NavLink}
                                href={(link as NavStructureLink).link}
                                className="w-full"
                              >
                                {link.title}
                              </Disclosure.Button>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}

                {/* User menu */}
                {sessionData ? (
                  <li>
                    <div className="my-3 w-full border-t opacity-30"></div>

                    <div className="px-5 py-3">
                      <ProfileInfo full />
                    </div>

                    <Disclosure.Button
                      className={`${NavLinkClasses} w-full text-left`}
                      onClick={() => signOut()}
                    >
                      Log Out
                    </Disclosure.Button>
                  </li>
                ) : (
                  <li>
                    <Disclosure.Button
                      className={`${NavLinkClasses} w-full text-left`}
                      type="button"
                      onClick={() => signIn("twitch")}
                    >
                      Sign In
                    </Disclosure.Button>
                  </li>
                )}
              </ul>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
