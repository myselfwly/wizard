import { NextFunction } from 'express';
import { exReq, exRes } from '../../../declear';
import HttpStatusCode from '../../../utils/HttpStatusCode';
import formDataParser from '../../../utils/operation/formDataParser';
interface SignUpType {
  userName: string;
  password: string;
  surePassword: string;
  questions: [
    {
      question: string;
      answer: string;
    },
    {
      question: string;
      answer: string;
    },
    {
      question: string;
      answer: string;
    }
  ];
}
interface DoSignUpParam {
  userName: string;
  password: string;
  surePassword: string;
  questions: [
    {
      question: string;
      answer: string;
    },
    {
      question: string;
      answer: string;
    },
    {
      question: string;
      answer: string;
    }
  ];
}
const doSignUp = (param: DoSignUpParam) => {
  console.log(param);
};
export const signUp = async (req: exReq, res: exRes, next: NextFunction) => {
  const resault: SignUpType = await formDataParser(req, res);
  const { userName, password, questions, surePassword } = resault;
  doSignUp({ userName, password, questions, surePassword });
  res.status(HttpStatusCode.OK).json({ ...resault });
};
