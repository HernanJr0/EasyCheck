import { Grid } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

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
      <Grid className="absolute justify-center items-center w-screen flex h-20">
        {Object.keys(enderecos).map((chave) => {
          const { nome, link } = enderecos[chave];
          return (
            <Link
              key={chave}
              to={link}
              color={"white"}
              style={{ marginInline: "8px" }}
            >
              {nome}
            </Link>
          );
        })}
      </Grid>
      <Outlet />
    </>
  );
}
