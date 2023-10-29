import { faUserSecret } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRootData } from "~/hooks/useRootData";

export function PreviewModeBubble() {
  const data = useRootData();

  if (!data.previewMode) return null;

  return (
    <div>
      <form action="/resource/preview" method="POST">
        <button className="bg-secondary fixed bottom-0 right-0 m-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 shadow-lg hover:text-stone-600 hover:shadow-md">
          <FontAwesomeIcon
            icon={faUserSecret}
            size="2xl"
            className=" fill-current"
          />
        </button>
      </form>
    </div>
  );
}
