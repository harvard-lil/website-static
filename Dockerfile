# Stage 1: Build and install Node.js dependencies
FROM node:18-alpine as nodebuilder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use Yarn)
COPY app/package.json app/package-lock.json ./

# Install dependencies
RUN npm install

# Optionally, if your application needs to be built:
# COPY app/ ./
# RUN npm run build

# Stage 2: Setup the final image with Jekyll and Node.js environment
FROM tiryoh/jekyll:4.2.1

# Copy Node.js build artifacts from the previous stage
COPY --from=nodebuilder /app/node_modules /srv/jekyll/node_modules

# Copy your application code, if there's anything to run directly
# COPY --from=nodebuilder /app /srv/jekyll

# Set the working directory
WORKDIR /srv/jekyll

# Add Node.js and npm to PATH
ENV PATH="/srv/jekyll/node_modules/.bin:${PATH}"

# Continue setting up your Jekyll environment
# For example, copy over your Jekyll site files
# COPY . /srv/jekyll

# Expose the port Jekyll will run on
EXPOSE 8080

# Command to run your Jekyll site
CMD ["jekyll", "build", "--watch"]