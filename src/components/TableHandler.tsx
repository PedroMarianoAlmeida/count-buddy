import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

interface TableProps<T extends string> {
  columnHeaders: {
    key: T;
    value: ReactNode;
    headerExtraClasses?: string;
    rowExtraClasses?: string;
  }[];
  rows: Record<T, ReactNode>[];
  caption?: string;
}

const TableHandler = ({ columnHeaders, rows, caption }: TableProps<string>) => {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columnHeaders.map((header) => (
            <TableHead className={header.headerExtraClasses} key={header.key}>
              {header.value}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {columnHeaders.map((header) => (
              <TableCell key={header.key} className={header.rowExtraClasses}>
                {row[header.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableHandler;
