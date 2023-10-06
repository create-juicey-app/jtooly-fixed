/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/feet",
        destination:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRusO5armOcRXcyiUl-6mi9F5l-Qi8UJ0oB2JvlIhs&s",
      },
    ];
  },
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-left",
  },
};
