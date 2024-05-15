# Utilizza l'immagine base di .NET 8 SDK per la fase di build
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 7001
# Fase di build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copia il file di progetto e ripristina le dipendenze
COPY PortaleBiblioteca.Server.csproj ./
RUN dotnet restore "PortaleBiblioteca.Server.csproj"

# Copia il resto del codice sorgente e compila l'applicazione
COPY . .
RUN dotnet build "PortaleBiblioteca.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Fase di publish
FROM build AS publish
RUN dotnet publish "PortaleBiblioteca.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish

# Crea l'immagine finale
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PortaleBiblioteca.Server.dll"]
