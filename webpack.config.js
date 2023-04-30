const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const folders = [
  'index',
  'programme/index',
  'artistes/index',
  'contact/index'
]
const mapFolders = folders.map(filename => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `./src/views/${filename}.pug`),
      filename: `${filename}.html`,
      meta : {
        'og:title': { property: 'og:title', content: 'Brussels Dance' },
        'og:description': { property: 'og:description', content: "Refonte de l'identité graphique et du site web du festival Brussels Dance" },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': { property: 'og:url', content: 'https://brussels-dance.netlify.app/' },
        'og:image': { property: 'og:image', content: 'https://brussels-dance.netlify.app/assets/img/card_meta.jpg' },
        'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
        'twitter:title': { name: 'twitter:title', content: 'Brussels Dance' },
        'twitter:description': { name: 'twitter:description', content: "Refonte de l'identité graphique et du site web du festival Brussels Dance" },
        'twitter:image': { name: 'twitter:image', content: 'https://brussels-dance.netlify.app/assets/img/card_meta.jpg' }
      }
  })
})
module.exports = {
entry: './src/assets/js/script.js',
output: {
  filename: 'assets/js/script.js',
  path: path.resolve(__dirname, 'dist')
},

  module: {
        rules: [
          {
            test: /\.pug$/,
            use: [
              {
                loader: 'simple-pug-loader'
              }
            ]
          },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
          {
            test: /\.(ttf|eot|otf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/fonts/[name][ext]'
            }
          },
          {
            test: /\.(jpg|png|gif|webp|svg|ico|mp4)$/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/img/[name][ext]'
            }
          },
          {
            test: /\.webmanifest$/i,
            use: 'webpack-webmanifest-loader',
            type: 'asset/resource',
            generator: {
                filename: './[contenthash:7][ext]'
              }
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      'autoprefixer',
                    ]
                  ]
                }
              }
            }, 'sass-loader']
          }

        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'assets/style/style.css'
      }),
      new CopyPlugin({
        patterns: [
          { from: "./src/assets/favicon", to: "assets/favicon" },
        ],
      }),
      ].concat(mapFolders)
};