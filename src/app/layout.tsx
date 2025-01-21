import React from "react";
import LayoutRecoil from "./layout.recoil";
import localFont from 'next/font/local';

export const metadata = {
  title: "myfair front pre-course",
  description: "todolist",
};

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard/Pretendard-Bold.subset.woff2',
      weight: '700',
    },
    {
      path: '../../public/fonts/Pretendard/Pretendard-SemiBold.subset.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/Pretendard/Pretendard-Medium.subset.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/Pretendard/Pretendard-Regular.subset.woff2',
      weight: '400',
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <LayoutRecoil>{children}</LayoutRecoil>
      </body>
    </html>
  );
}
