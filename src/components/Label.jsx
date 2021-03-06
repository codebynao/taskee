import styled from "styled-components";
import classNames from "classnames";

const StyledLabel = styled.label`
  width: 100%;
  height: auto;
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.muted};

  .label__content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: initial;
  }
`;

const Label = ({ children, className, ...props }) => {
  const cssClasses = classNames("label", className);

  return (
    <StyledLabel className={cssClasses} {...props}>
      <span className="label__content">{children}</span>
    </StyledLabel>
  );
};

export default Label;
