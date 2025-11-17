"use client";
import { create } from "zustand";

type PageActions = {
  onBack?: () => void;
  onNext?: () => void;
  onBackText?: string;
  onNextText?: string;
  setActions: (actions: {
    onBack?: () => void;
    onNext?: () => void;
    onBackText?: string;
    onNextText?: string;
  }) => void;
  clearActions: () => void;
};

export const usePageActions = create<PageActions>((set) => ({
  onBack: undefined,
  onNext: undefined,
  setActions: (actions) => set(actions),
  clearActions: () =>
    set({
      onBack: undefined,
      onNext: undefined,
      onBackText: "بازگشت",
      onNextText: "ادامه",
    }),
}));
