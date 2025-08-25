import React from 'react'
import OnboardingForm from './_components/onboardingform'
import { industries } from '@/data/industries'
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';

const OnboardingPage = async() => {

  const {isOnboarded} = await getUserOnboardingStatus();

  if (isOnboarded) redirect('/dashboard');
  
  return <OnboardingForm industries = {industries} />
}
export default OnboardingPage