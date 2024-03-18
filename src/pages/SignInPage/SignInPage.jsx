import {
  ErrorSpan,
  LoginWrapper,
  StyledSection,
  ImgWrapper,
} from './SigninPage.styled';
import {
  FormBtn,
  FormInput,
  FormLabel,
  PassShowBtn,
} from '../../components/AuthForm/AuthForm.styled';

import { useMediaQuery } from 'react-responsive';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operations';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import AuthForm from '../../components/AuthForm/AuthForm';

import PassEye from '../../assets/PassEye';
import Bottle from '../../assets/MobileBg/SignInBgMob.webp';
import BottleTablet from '../../assets/TabletBg/SignInBgTab.webp';
import BottleDesktop from '../../assets/DesktopBg/SignInBg.webp';
import OpenPassEye from '../../assets/OpenPassEye';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Please write valid email')
      .matches(/^(?!.*@[^,]*,)/)
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64)
      .required('Password is required'),
  })
  .required();

const SignInPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const [eyePass, setEyePass] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  function submit(data) {
    dispatch(loginThunk(data))
      .unwrap()
      .then((res) => {
        toast.success(`Welcome ${res.user.username}`);
        navigate('/home');
      })
      .catch((err) => toast.error(err));
  }

  function showPass() {
    eyePass ? setEyePass(false) : setEyePass(true);
  }

  return (
    <StyledSection>
      <LoginWrapper>
        <AuthForm
          on={true}
          handleSubmit={handleSubmit}
          submit={submit}
          errors={errors}
        >
          <FormLabel>
            Enter your email
            <FormInput
              type="text"
              placeholder="E-mail"
              name="email"
              required
              {...register('email')}
            />
            <ErrorSpan>{errors?.email?.message}</ErrorSpan>
          </FormLabel>
          <FormLabel>
            Enter your password
            <FormInput
              type={eyePass ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              required
              {...register('password')}
            />
            <ErrorSpan>{errors?.password?.message}</ErrorSpan>
            <PassShowBtn type="button" onClick={showPass}>
              {eyePass ? <OpenPassEye /> : <PassEye />}
            </PassShowBtn>
          </FormLabel>
          <FormBtn type="submit">Sign In</FormBtn>
        </AuthForm>
        <ImgWrapper>
          {isMobile && <img src={Bottle} />}
          {isTablet && <img src={BottleTablet} />}
          {isDesktop && <img src={BottleDesktop}  />}
        </ImgWrapper>
      </LoginWrapper>
    </StyledSection>
  );
};

export default SignInPage;
