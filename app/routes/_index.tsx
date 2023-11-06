import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPatients } from "~/client/getPatients";
import {useLoaderData} from "@remix-run/react";
import ExpandableTable from "~/components/ExpandableTable";

export const meta: V2_MetaFunction = () => [{ title: "New Remix App" }];

export const loader = async () => {
  const patients = await getPatients();

  return json({ patients });
};

export default function Index() {
  const { patients } = useLoaderData<typeof loader>();

  return (
      <div className="mt-10 flex-grow px-4 md:px-16 lg:px-32">
        <h1 className="text-4xl mb-10 font-bold text-red-700">GraphAware Test</h1>
        <ExpandableTable patients={patients} />
      </div>
  );
}
