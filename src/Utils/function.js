import AsyncStorage from "@react-native-async-storage/async-storage";
export const generateUrlParams = (obj) => {
  let generatedUrl = ``;
  const arrayOfObjectKeys = Object.keys(obj);
  arrayOfObjectKeys.forEach((key) => {
    if (obj[key] || obj[key] === false) {
      generatedUrl += `${key}=${obj[key]}&`;
    }
  });
  return generatedUrl;
};


export const formatOptions = (
  items,
  label,
  value
) => {
  return items?.length > 0
    ? items.map((sessionData) => {
      const newObj = {};
      if (Array.isArray(value)) {
        value.forEach((item) => {
          newObj[item] = sessionData[item];
        });
      }
      return {
        key: Array.isArray(value) ? newObj : sessionData[value],
        value: Array.isArray(label)
          ? `${sessionData[label[0]]} (${sessionData[label[1]]})`
          : sessionData[label],
      };
    })
    : [];
};


export const clearPersistRoot = async () => {
  try {
    await AsyncStorage.removeItem('persist:root');
    console.log('AsyncStorage with key persist:root cleared successfully.');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

export const buildProviderTree = (componentsWithProps) => {
  const initialComponent = ({ children }) => <>{children}</>;
  return componentsWithProps.reduce(
    (AccumulatedComponents, [Provider, props = {}]) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <Provider {...(props || {})}>{children}</Provider>
          </AccumulatedComponents>
        );
      };
    },
    initialComponent
  );
};


export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};



const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    // Handle error as needed
  }
};


export const truncateText = (text) => {
  const words = text?.split(' ');
  const truncatedWords = words?.slice(0, 6).join(' ');

  if (words?.length > 6) {
    return `${truncatedWords} ...`;
  }

  return truncatedWords;
}


export const generateQueryKey = (baseKey, searchFilter) => {
  const searchFilterString = JSON.stringify(searchFilter);
  const queryKey = `${baseKey}-${searchFilterString}`;

  return queryKey;
};
