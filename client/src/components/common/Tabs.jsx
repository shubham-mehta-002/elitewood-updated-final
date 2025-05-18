import React from "react";

const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  const tabList = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "TabsList"
  );
  const tabTriggers = tabList.length > 0 ? React.Children.toArray(tabList[0].props.children) : [];
  const tabContents = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "TabsContent" && child.props.value === activeTab
  );

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div>
      <div className="tabs-list flex flex-right ml-2">
        {tabTriggers.map((trigger) =>
          React.cloneElement(trigger, {
            isActive: trigger.props.value === activeTab,
            onClick: () => handleTabChange(trigger.props.value),
          })
        )}
      </div>
      <div className="tabs-content">{tabContents}</div>
    </div>
  );
};

const TabsList = ({ children, className = "" }) => {
  return <div className={`${className}`}>{children}</div>;
};

TabsList.displayName = "TabsList";

const TabsTrigger = ({ value, isActive, onClick, children, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 mb-2 mr-1 focus:outline-none ${
        isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"
      } ${className}`}
    >
      {children}
    </button>
  );
};

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ value, children }) => {
  return <div>{children}</div>;
};

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
