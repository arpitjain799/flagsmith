module.exports = (envId, { LIB_NAME, TRAIT_NAME, FEATURE_NAME, FEATURE_NAME_ALT }, USER_ID) => `
// Home Page
import flagsmith from '${LIB_NAME}';
import { useFlags, useFlagsmith } from 'flagsmith/react';

export default function HomePage() {
  const flags = useFlags(['${FEATURE_NAME}','${FEATURE_NAME_ALT}']); // only causes re-render if specified flag values / traits change
  const ${FEATURE_NAME} = flags.${FEATURE_NAME}.enabled
  const ${FEATURE_NAME_ALT} = flags.${FEATURE_NAME_ALT}.value

  const identify = () => {
    flagsmith.identify('${USER_ID}', {${TRAIT_NAME}:21}); // only causes re-render if the user has overrides / segment overrides for ${FEATURE_NAME} or ${FEATURE_NAME_ALT}
  };

  const setTrait = () => {
    ${LIB_NAME}.setTrait("${TRAIT_NAME}", 22); // only causes re-render if the user has overrides / segment overrides for ${FEATURE_NAME} or ${FEATURE_NAME_ALT}
  };

  return (
    &lt;>{...}&lt;/>
  );
}`;
