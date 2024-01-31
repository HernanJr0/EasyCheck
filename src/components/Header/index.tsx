import { Link } from "@mui/material";

interface Enderecos {
  [key: string]: {
    nome: string;
    link: string;
  };
}

const enderecos: Enderecos = {
  todo: {
    nome: "To-do",
    link: "/todo",
  },
  pomodoro: {
    nome: "Pomodoro",
    link: "/pomodoro",
  },
};

export default function Header() {
  return (
    <div className="absolute justify-center items-center w-screen flex h-20">
      {Object.keys(enderecos).map((chave) => {
        const { nome, link } = enderecos[chave];
        return (
          <Link
            key={chave}
            underline="hover"
            href={link}
            color={"white"}
            marginInline={"10px"}
          >
            {nome}
          </Link>
        );
      })}
    </div>
  );
}
