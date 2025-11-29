const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="px-4 py-2 flex justify-center items-center shadow-sm bg-zinc-50 dark:bg-gray-900 ">
      <p className="text-center text-base dark:text-gray-400">
        &copy;{currentYear}. All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
