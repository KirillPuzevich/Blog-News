import React, { FC } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { activationEmailMiddlewareAction } from "../../store/actions";
import { Spinner } from "../../components/spinner/index";
import "./styles.scss";

export const ActivationEmailPage: FC = () => {
  const dispatch = useDispatch();
  const { uid, token } = useParams();

  useEffect(() => {
    console.log(uid, token);
    //@ts-expect-error
    dispatch(activationEmailMiddlewareAction(uid, token));
  }, []);

  return <h1>Loading...</h1>;
};
