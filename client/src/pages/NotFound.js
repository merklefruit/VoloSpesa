import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import PageLayout from "../components/Layout/PageLayout";

function NotFound() {
  return (
    <PageLayout>
      <Result
        status="404"
        title="404"
        subTitle="La pagina che cerchi non esiste."
        extra={
          <Link to="/">
            <Button type="primary" size="large">
              Torna alla Home
            </Button>
          </Link>
        }
      />
    </PageLayout>
  );
}

export default NotFound;
