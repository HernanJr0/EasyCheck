import { Grid } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

interface Enderecos {
  [key: string]: {
    nome: string;
    link: string;
  };
}

const enderecos: Enderecos = {
  todo: {
    nome: "To-do",
    link: "/",
  },
  pomodoro: {
    nome: "Pomodoro",
    link: "/pomodoro",
  },
};

export default function Layout() {
  return (
    <>
      {/* <Grid className="absolute justify-center items-center w-screen flex h-20">
        {Object.keys(enderecos).map((chave) => {
          const local = useLocation();
          let cor = "gray";
          const { nome, link } = enderecos[chave];
          if (link == local.pathname) {
            cor = "white";
          }
          return (
            <Link
              key={chave}
              to={link}
              className="hover:underline"
              style={{ marginInline: "8px", color: cor }}
            >
              {nome}
            </Link>
          );
        })}
      </Grid> */}
      <Outlet />
    </>
  );
}
