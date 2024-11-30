import { ThemeProvider } from 'next-themes';

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider defaultTheme='system' attribute='class' enableSystem>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;