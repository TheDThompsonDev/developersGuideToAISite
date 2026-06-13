"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getClickContext, trackEvent } from "../lib/analytics";
import { RetailerCards } from "./RetailerCards";

type BuyBookModalProps = {
  children: React.ReactNode;
  className: string;
  analyticsPlacement: string;
};

export function BuyBookModal({
  children,
  className,
  analyticsPlacement,
}: BuyBookModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeModal = useCallback((closeMethod: string) => {
    trackEvent("buy_modal_close", {
      close_method: closeMethod,
      buy_opener_placement: analyticsPlacement,
    });
    setIsOpen(false);
  }, [analyticsPlacement]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal("escape_key");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, isOpen]);

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/85 px-4 py-6 backdrop-blur-sm sm:px-6 lg:py-12"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeModal("backdrop");
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-6xl border-2 border-signal bg-ink p-5 shadow-[10px_10px_0px_#fae37d] sm:p-8"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => closeModal("close_button")}
          aria-label="Close buy options"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-ink-3 bg-ink-2 text-bone hover:border-signal hover:text-signal"
        >
          ×
        </button>

        <div className="mb-8 pr-12">
          <p className="kicker mb-4">Get the Book</p>
          <h2
            id={titleId}
            className="font-display text-4xl leading-[1.02] text-bone sm:text-5xl"
          >
            Pick your preferred retailer.
          </h2>
          <p className="mt-4 max-w-2xl text-bone-muted">
            Paperback, ebook, and Kindle formats are available now.
          </p>
        </div>

        <RetailerCards
          placement="buy_modal"
          sourcePlacement={analyticsPlacement}
        />
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          trackEvent("buy_modal_open", {
            buy_opener_placement: analyticsPlacement,
            button_text:
              event.currentTarget.textContent?.replace(/\s+/g, " ").trim() ||
              "Buy the Book",
            ...getClickContext(event),
          });
          setIsOpen(true);
        }}
        className={className}
      >
        {children}
      </button>

      {isOpen && createPortal(modal, document.body)}
    </>
  );
}
