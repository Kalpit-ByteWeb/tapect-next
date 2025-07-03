import { getDomain, getLocaleByDomain } from "@/libs/Assets/DomainWiseData";

const API_URL_ENV = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL_ENV);
// ✅ Now accepts optional `domain` as 3rd argument for SSR use
export const buildApiUrl = (
  layoutPath = "",
  localeFilter: boolean = true,
  domainOverride?: string
): string => {
  const domain = domainOverride ?? getDomain();
  const locale = getLocaleByDomain(domain);

  const baseUrl = `${API_URL_ENV}pages`;

  const localeQuery =
    locale && localeFilter ? `filters[locale][$eq]=${locale}&` : "";

  const populatePath = layoutPath
    ? `populate[PageSections][on]${layoutPath}[populate]=*`
    : `populate[PageSections][populate]=*`;

  return `${baseUrl}?${localeQuery}${populatePath}`;
};

export const buildAPIUrlheader = (
  layoutPath = "",
  localeFilter: boolean = true,
  domainOverride?: string
): string => {
  const domain = domainOverride ?? getDomain();
  const locale = getLocaleByDomain(domain);

  const baseUrl = `${API_URL_ENV}header`;

  const localeQuery =
    locale && localeFilter ? `filters[locale][$eq]=${locale}&` : "";

  const populatePath = layoutPath
    ? `populate${layoutPath}[populate]=*`
    : `populate=*`;

  return `${baseUrl}?${localeQuery}${populatePath}`;
};

export const buildAPIUrlfooter = (
  layoutPath = "",
  localeFilter: boolean = true,
  domainOverride?: string
): string => {
  const domain = domainOverride ?? getDomain();
  const locale = getLocaleByDomain(domain);

  const baseUrl = `${API_URL_ENV}footer`;

  const localeQuery =
    locale && localeFilter ? `filters[locale][$eq]=${locale}&` : "";

  const populatePath = layoutPath
    ? `populate${layoutPath}[populate]=*`
    : `populate=*`;

  return `${baseUrl}?${localeQuery}${populatePath}`;
};
