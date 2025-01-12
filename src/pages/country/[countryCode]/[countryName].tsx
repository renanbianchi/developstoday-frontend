import { GetStaticPaths, GetStaticProps } from "next";
import { Country as CountryType } from "../..";
import { geistMono, geistSans } from "../..";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis  } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export interface PageParams {
  countryCode: string;
  countryName: string;
}

export interface Country {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
}

export interface CountryBorders {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Country[] | null;
}

export interface CountryFlag {
  error: boolean;
  msg: string;
  data: {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
  }
}

export interface CountryPopulation {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: {
      year: number;
      value: number;
    }[]
  }

}

export interface CountryDataResponse {
  countryBorders: CountryBorders;
  countryFlag: CountryFlag;
  populationData: CountryPopulation;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig
 
export const getStaticPaths = (async () => {
  const res = await fetch('http://localhost:3002/all')
  const countries = await res.json()

  const paths = countries.map((country: CountryType) => ({
    params: { countryCode: country.countryCode, countryName: country.name },
  }))

  console.log("Generated paths:", paths);
  return {
    paths,
    fallback: true,
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  const { params } = context || {};

  const { countryCode, countryName } = params as unknown as PageParams

  const res = await fetch(`http://localhost:3002/country`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      countryCode: countryCode, 
      countryName: countryName
    })
  })

  const data = await res.json()
  return {
    props: { data },
  }
}) satisfies GetStaticProps

export default function Country({data}: {data: CountryDataResponse}) {
  console.log(data.populationData.data.populationCounts)
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col text-center justify-center gap-10 sm:gap-28 items-center justify-items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-3xl sm:text-4xl  font-bold">{data.countryBorders.commonName} - {data.countryBorders.officialName}</h1>

      <div className="flex flex-row flex-1 justify-center items-center flex-wrap gap-10 sm:gap-28">
        <Image src={data.countryFlag.data.flag} alt = {data.countryFlag.data.name} width={400} height={400}/>
        <Card className="w-[auto]" >
          <CardHeader>
            <CardTitle>Border Countries</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {data.countryBorders.borders?.map((country) => (
              <Link href={`/country/${country.countryCode}/${country.commonName}`} key={country.countryCode} className="flex flex-col gap-2">
                <p>{country.commonName}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold">Country Population</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data.populationData.data.populationCounts}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
    </div>
  );
}