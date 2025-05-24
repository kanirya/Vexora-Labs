FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["VexoraLabs.csproj", "./"]
RUN dotnet restore "VexoraLabs.csproj"

COPY . .
RUN dotnet build "VexoraLabs.csproj" -c $BUILD_CONFIGURATION -o /app/build
RUN dotnet publish "VexoraLabs.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "VexoraLabs.dll"]
