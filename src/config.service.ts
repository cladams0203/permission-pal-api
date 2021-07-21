import dotenv from "dotenv";
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = false): string | undefined {
    const value = this.env[key];
    if (!value && throwOnMissing) throw new Error(`config error - missing env.${key}`);

    return value;
  }

  public getCloudinaryConfig() {
    return {
      cloud_name: this.getValue("CLOUD_NAME"),
      api_key: this.getValue("CLOUDINARY_API_KEY"),
      api_secret: this.getValue("CLOUDINARY_API_SECRET"),
      secure: true,
    };
  }

  public getDBUrl() {
    return this.getValue("DATABASE_URL");
  }

  public getJwtSecret() {
    return this.getValue("JWT_SECRET");
  }
}

const configService = new ConfigService(process.env);

export { configService };
