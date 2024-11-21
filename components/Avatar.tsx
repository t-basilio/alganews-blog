import Image from "next/image";
import { styled } from "styled-components";
import avatar from "../public/avatar.jpg";
import { useState } from "react";

interface AvatarProps {
  src: string;
}

export default function Avatar(props: AvatarProps) {
  const [src, setSrc] = useState(props.src);
  return (
    <>
      <StyledAvatar
        alt="avatar"
        width={40}
        height={40}
        src={src}
        onError={() => {
          setSrc(avatar.src);
        }}
      />
    </>
  );
}

const StyledAvatar = styled(Image)`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 0 0 4px ${(p) => p.theme.primaryForeground};
`;
