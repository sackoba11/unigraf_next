"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { mainNavigation, siteConfig, type NavItem } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { dropdownVariants, easeOut } from "@/lib/motion";

const navLinkClass =
  "relative inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-brand-orange/10 hover:text-brand-orange";

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive =
    item.href !== "#" &&
    (pathname === item.href ||
      item.children?.some((child) => child.href === pathname));

  if (item.disabled) {
    return (
      <span
        className={`${navLinkClass} cursor-not-allowed text-slate-400 hover:bg-transparent hover:text-slate-400`}
        title="Bientôt disponible"
      >
        {item.label}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      className={`${navLinkClass} ${isActive ? "text-brand-orange" : "text-slate-700"}`}
    >
      {item.label}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-brand-orange"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <NavLink item={item} />
      <AnimatePresence>
        {hovered && item.children?.length && (
          <motion.div
            className="absolute left-0 top-full z-50 pt-2"
            initial={reduced ? false : "hidden"}
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
          >
            <div
              className={`overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl shadow-slate-200/50 ${
                (item.children?.length ?? 0) >= 6 ? "grid min-w-[28rem] grid-cols-2" : "min-w-52"
              }`}
            >
              {item.children.map((child, index) =>
                child.disabled ? (
                  <span
                    key={child.label}
                    className="block px-4 py-2.5 text-sm text-slate-400"
                  >
                    {child.label}
                  </span>
                ) : (
                  <motion.div
                    key={child.href}
                    initial={reduced ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={child.href}
                      onClick={() => setHovered(false)}
                      className="block px-4 py-2.5 text-sm text-slate-700 transition-colors duration-200 hover:bg-brand-orange/5 hover:text-brand-orange"
                    >
                      {child.label}
                    </Link>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({
  item,
  index,
  menuOpen,
  onClose,
}: {
  item: NavItem;
  index: number;
  menuOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const hasChildren = Boolean(item.children?.length);
  const isSectionActive =
    pathname === item.href ||
    item.children?.some((child) => child.href === pathname);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      setExpanded(false);
      return;
    }
    if (isSectionActive && hasChildren) {
      setExpanded(true);
    }
  }, [menuOpen, isSectionActive, hasChildren]);

  if (!hasChildren) {
    const leaf = item.disabled ? (
      <span className="block rounded-lg px-3 py-2.5 text-sm text-slate-400">{item.label}</span>
    ) : (
      <Link
        href={item.href}
        onClick={onClose}
        className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-brand-orange/10 hover:text-brand-orange ${
          pathname === item.href ? "bg-brand-orange/10 text-brand-orange" : "text-slate-700"
        }`}
      >
        {item.label}
      </Link>
    );

    if (reduced) return <div>{leaf}</div>;

    return (
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.04, duration: 0.25, ease: easeOut }}
      >
        {leaf}
      </motion.div>
    );
  }

  const accordion = (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-brand-orange/5 hover:text-brand-orange"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className={isSectionActive ? "text-brand-orange" : undefined}>{item.label}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 border-t border-slate-200/80 px-2 py-2">
              {!item.disabled && (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-orange/10 hover:text-brand-orange ${
                    pathname === item.href
                      ? "bg-brand-orange/10 text-brand-orange"
                      : "text-slate-600"
                  }`}
                >
                  Tout voir — {item.label}
                </Link>
              )}
              {item.children!.map((child) =>
                child.disabled ? (
                  <span key={child.label} className="block px-3 py-2 text-sm text-slate-400">
                    {child.label}
                  </span>
                ) : (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-orange/10 hover:text-brand-orange ${
                      pathname === child.href
                        ? "bg-brand-orange/10 text-brand-orange"
                        : "text-slate-600"
                    }`}
                  >
                    {child.label}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (reduced) return <div>{accordion}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25, ease: easeOut }}
    >
      {accordion}
    </motion.div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const shadow = useTransform(
    scrollY,
    [0, 24],
    ["0 0px 0px rgba(0,0,0,0)", "0 6px 28px -6px rgba(12, 35, 64, 0.16)"],
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md"
      initial={reduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
      style={{ boxShadow: reduced ? undefined : shadow }}
    >
      <Container>
        <div className="flex h-20 items-center gap-4">
          {/* Logo — largeur limitée pour ne pas écraser le menu */}
          <Link
            href="/"
            className="flex min-w-0 shrink-0 flex-col justify-center xl:max-w-[280px]"
          >
            <span className="truncate text-base font-bold leading-tight text-brand-navy sm:text-lg xl:text-xl">
              {siteConfig.name}
            </span>
            <span className="hidden truncate text-xs leading-snug text-slate-500 2xl:block">
              {siteConfig.tagline}
            </span>
          </Link>

          {/* Navigation desktop — centrée, à partir de xl pour éviter le tassement */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
            {mainNavigation.map((item) =>
              item.children?.length ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <NavLink key={item.label} item={item} />
              ),
            )}
          </nav>

          {/* CTA + menu mobile */}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <Button href="/devis" className="whitespace-nowrap px-4 py-2.5 text-sm">
                Demander un devis
              </Button>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2.5 text-slate-700 xl:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="border-t border-slate-200 xl:hidden"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: easeOut }}
            >
              <nav
                aria-label="Menu mobile"
                className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-y-contain py-4 [-webkit-overflow-scrolling:touch]"
              >
                <div className="space-y-2">
                  {mainNavigation.map((item, index) => (
                    <MobileNavItem
                      key={item.label}
                      item={item}
                      index={index}
                      menuOpen={open}
                      onClose={() => setOpen(false)}
                    />
                  ))}
                </div>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <Button href="/devis" className="w-full justify-center">
                    Demander un devis
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}
