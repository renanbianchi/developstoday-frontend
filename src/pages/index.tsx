import { Geist, Geist_Mono } from "next/font/google";
import { GetStaticProps } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export type Country = {
  countryCode: string;
  name: string;
}

type AllCountries = {
  countries: Country[];
}

export const getStaticProps = (async () => {
  const res = await fetch('http://localhost:3002/all')

  const countries = await res.json()

  return { props: { countries } }

}) satisfies GetStaticProps<{

  countries: AllCountries
}>

export default function Home({ countries }: AllCountries) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1>Hi there, this is a country information website.</h1>
      <div className="flex flex-row flex-1 flex-wrap gap-10 sm:gap-28">
        {countries.map((country) => (
          <Link key={country.countryCode} href={`/country/${country.countryCode}/${country.name}`}>
            <Card className="w-36 max-w-40" >
              <CardHeader>
                <CardTitle>{country.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{country.countryCode}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>


    </div>
  );
}
