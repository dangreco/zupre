import { FunctionComponent } from "preact";
import styled from "styled-components";
import { useEntity, useUser } from "../hooks";

const Card: FunctionComponent = () => {
  const user = useUser();
  const sun = useEntity('sun.sun');

  return (
    <Root>
      <Text>Hello, { user?.name } !</Text>
      <pre>
        The sun's state: { sun?.state }
      </pre>
    </Root>
  )
};

export default Card;

const Text = styled.p`
  color: var(--primary-color);
  font-weight: bold;
`;

const Root = styled.div`
  padding: 1rem;
`