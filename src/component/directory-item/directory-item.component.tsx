import { useNavigate } from "react-router-dom";
import {
  DirectioryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

import { DirectoryCategory } from "../directory/directory.component";
import { FC } from "react";

type DireactoryItemProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DireactoryItemProps> = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <DirectioryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectioryItemContainer>
  );
};
export default DirectoryItem;
