import styled from "styled-components";

export const Top = styled.div`

    display: flex;
    
    img {
    margin-right: 3px;
    object-fit: cover;
    background-position: center center;
    height: 40px;
    position: relative;
    border-radius: 50%;
    }

    a {
        margin-top: 12px;
    }
`

export const Comment = styled.div` 
    margin-top: 10px;
    h4 {
        font-size: 20px;
        font-weight: 500;
    }
    p {
        /* font-weight: 100; */
        margin-top: 10px;
        font-size: 15px;
    }
`

export const InsertRecado = styled.div` 
    display: flex;
    
    img {
    margin-left: 7px;
    object-fit: cover;
    background-position: center center;
    height: 30px;
    position: relative;
    border-radius: 50%;
    }
    a {
        color: #2E7BB4;
    }
    a:link {
        text-decoration: none;
    }
`