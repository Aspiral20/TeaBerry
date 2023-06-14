import React, { FC } from 'react';
import { AnimatedNumber, CardContent, TitlePage } from "./index";
import cn from "classnames";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CountStatusesProductsType } from "../../_types/data";

interface StatisticProgressBarProps {
  isLoading: boolean
  title: string
  name: string
  dataField: string
  setData: React.Dispatch<React.SetStateAction<CountStatusesProductsType>>
  data: CountStatusesProductsType
}

const StatisticProgressBar: FC<StatisticProgressBarProps> = ({
  isLoading,
  title,
  name,
  dataField,
  setData,
  data,
}) => {
  return (
    <CardContent
      isLoading={isLoading}
      className="count_products_container"
    >
      <div className="header_statistic_info">
        <TitlePage
          title={title}
          className="main_title margin_bottom"
          classNames={{
            titleChapter: 'main_chapter_title',
          }}
        />
        <div className="status_count_container text">
          {data.map(item => (
            <div key={item[dataField]} className="status_count">
              <div className={cn(`circle_color_status ${name}_${item[dataField]}_color`)}/>
              <div className="status_text text">
                {item[dataField]}:
              </div>
              <div className="count text base_color opacity-75">
                <AnimatedNumber params={{ num: item.count }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProgressBar className="progress_bar_container">
        {data.map((item, index) => item[dataField] !== 'total' && (
          <ProgressBar
            key={item[dataField]}
            className={`progress_bar_item text white_color ${name}_${item[dataField]}_color`}
            label={(
              <>
                {item.percentage.toFixed(1)}
                <div
                  className="progress_bar_fon"
                  onMouseEnter={() => setData(prev => prev.map(statusItem => statusItem[dataField] === item[dataField] ? ({
                    ...statusItem,
                    isHovered: true
                  }) : statusItem))}
                  onMouseLeave={() => setData(prev => prev.map(statusItem => statusItem[dataField] === item[dataField] ? ({
                    ...statusItem,
                    isHovered: false
                  }) : statusItem))}
                />
              </>
            )}
            animated
            now={item.percentage}
          />
        ))}
      </ProgressBar>

      {data.map(item => (
        <CardContent key={item[dataField]} className={cn("info_name_progress_bar", { active: item.isHovered === true })}>
          {item[dataField]}: {item.percentage}%
        </CardContent>
      ))}
    </CardContent>
  );
};

export default StatisticProgressBar;