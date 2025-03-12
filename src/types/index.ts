import { JSX } from "react";

/**
 * NavigationMenuItemType interface
 */
export interface NavigationMenuItemType {
  icon?: JSX.Element;
  title: string;
  href: string;
}

/**
 * ActionReturnType is a generic type that defines the return type of an action.
 */
export type ActionReturnType<T> = {
  error?: string;
  data?: T;
  message?: string;
};
