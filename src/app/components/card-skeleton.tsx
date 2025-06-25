import ContentLoader from "react-content-loader";


function CardSkeleton() {
  return (
    <ContentLoader speed={2} width={300} height={400}>
      <rect x="0" y="0" rx="8" ry="8" width="300" height="256" />
      <rect x="16" y="270" rx="4" ry="4" width="200" height="20" />
      <rect x="16" y="300" rx="4" ry="4" width="120" height="16" />
      <rect x="16" y="330" rx="3" ry="3" width="250" height="60" />
    </ContentLoader>
  );
}
