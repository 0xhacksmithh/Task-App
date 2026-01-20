import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { validateUser } from "./grpc/auth.server.js";

const protoPath = path.resolve("proto/auth.proto");
const packageDef = protoLoader.loadSync(protoPath);
const grpcObject = grpc.loadPackageDefinition(packageDef);

const authPackage = grpcObject.auth;

export const startGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(authPackage.AuthService.service, {
    ValidateUser: validateUser,
  });

  server.bindAsync(
    "0.0.0.0:50051", ///
    // "http://localhost/50051",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error("gRPC bind failed:", err);
        return;
      }

      console.log(`🚀 gRPC Server running on port ${port}`);
    },
  );
};
