import { CardRegistry } from "./CardRegistry";

type Props = {
  card?: {
    type: string;
    data: any;
  };
};

export default function CardRenderer({ card }: Props) {

  if (!card) return null;

  const Component = CardRegistry[card.type];

  if (!Component) return null;

  return <Component data={card.data} />;
}