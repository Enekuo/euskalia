import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function TraductorSeoRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Traductor de euskera online y gratis | Euskalia</title>
        <meta
          name="description"
          content="Traductor de euskera online para traducir textos y frases entre euskera y español de forma rápida."
        />
      </Helmet>
    </>
  );
}
