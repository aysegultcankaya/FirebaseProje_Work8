import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../components/dataTable";
import Page from "../../../components/layout/Page";
import { initParams } from "../../../utils";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase-config";

const Educations = () => {
  const { t } = useTranslation();
  const [params, setParams] = useState(initParams); //başlangıç parametreleri
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onSnapshot(collection(db, "education"), (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
      setLoading(false);
      console.log("AA");
    });
  }, []);

  const columns = [
    {
      title: t("pages.education.code"),
      name: "code",
      flexGrow: 1,
    },
    {
      title: t("pages.education.name"),
      name: "name",
      flexGrow: 1,
    },
    {
      title: t("pages.education.description"),
      name: "description",
      flexGrow: 1,
    },
  ];

  return (
    <Page title={t("pages.education.title")}>
      <DataTable
        create="/educations/add"
        size="compact"
        columns={columns}
        rowKey="id"
        loading={loading}
        data={data}
        params={params}
        rowCount={data.length}
        setPagination={setParams}
      />
    </Page>
  );
};

export default Educations;
