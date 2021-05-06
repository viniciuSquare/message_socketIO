import styled from "styled-components";

export const AsideContainer = styled.aside`
  position: relative;
  border-right: 1px solid rgba(0, 0, 0, 0.201);

  /* section buttons */
  .collapsible {
    width: 100%;
    height: 3rem;

    font-size: 1.3rem;
    color: #989a9b;

    text-align: left;
    align-content: center;
    padding-left: 1.8rem;
    margin-bottom: 5px;
    
    border: none;
  } 

  .toCollapse {
    display: block;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    /* background-color: #f1f1f1; */
  }

  /* items */
   li {
    padding: 10px 1.25rem 10px;
    align-items: center;
    display: grid;

    /* border: 1px solid black; */
    color: #595a5b;  
  }

  .toCollapse li:hover {
    background-color: #ebebeb;
    border-radius: 0 50px 50px 0;
    width: 90%;
  }

  .toCollapse li h3 {
    font-weight: 400;

  }

  .toCollapse li p {
    opacity: 0.7;
    font-size: 0.8rem;

    margin-left: 0.3rem;

  }

  .rooms {
    position: absolute;
    width: 100%;
    top: 50%;
  }

`